(() => {
  "use strict";

  const requiredFiles = [
    "README.md",
    "index.html",
    "workflow-spec.md",
    "agent-spec.md",
    "install-guide.md",
    "approval-rules.md",
    "eval-template.csv",
    "agent-handoff.md",
    "artifact-manifest.json"
  ];

  const input = document.querySelector("#package-file");
  const verifyButton = document.querySelector("#verify-button");
  const downloadButton = document.querySelector("#download-report");
  const fileName = document.querySelector("#file-name");
  const title = document.querySelector("#result-title");
  const badge = document.querySelector("#result-badge");
  const summary = document.querySelector("#result-summary");
  const hashValue = document.querySelector("#hash-value");
  const entryCount = document.querySelector("#entry-count");
  const requiredCount = document.querySelector("#required-count");
  const unsafeCount = document.querySelector("#unsafe-count");
  const findings = document.querySelector("#findings");
  const presentList = document.querySelector("#present-list");
  const missingList = document.querySelector("#missing-list");

  let report = null;

  const hex = buffer => Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");

  function findEndOfCentralDirectory(view) {
    const minimum = Math.max(0, view.byteLength - 65557);
    for (let offset = view.byteLength - 22; offset >= minimum; offset -= 1) {
      if (view.getUint32(offset, true) === 0x06054b50) return offset;
    }
    throw new Error("ZIP end-of-directory record not found.");
  }

  function readZipEntries(buffer) {
    const view = new DataView(buffer);
    const eocd = findEndOfCentralDirectory(view);
    const totalEntries = view.getUint16(eocd + 10, true);
    const centralOffset = view.getUint32(eocd + 16, true);
    const decoder = new TextDecoder("utf-8");
    const names = [];
    let offset = centralOffset;

    for (let index = 0; index < totalEntries; index += 1) {
      if (offset + 46 > view.byteLength || view.getUint32(offset, true) !== 0x02014b50) {
        throw new Error("Invalid ZIP central directory.");
      }
      const nameLength = view.getUint16(offset + 28, true);
      const extraLength = view.getUint16(offset + 30, true);
      const commentLength = view.getUint16(offset + 32, true);
      const nameStart = offset + 46;
      const nameEnd = nameStart + nameLength;
      if (nameEnd > view.byteLength) throw new Error("Invalid ZIP filename boundary.");
      names.push(decoder.decode(new Uint8Array(buffer, nameStart, nameLength)));
      offset = nameEnd + extraLength + commentLength;
    }
    return names;
  }

  function normalizedNames(names) {
    const clean = names
      .filter(name => !name.endsWith("/"))
      .map(name => name.replaceAll("\\", "/").replace(/^\.\//, ""));
    const firstParts = clean.map(name => name.split("/")[0]);
    const oneRoot = firstParts.length > 0 && firstParts.every(part => part === firstParts[0]) && clean.every(name => name.includes("/"));
    return oneRoot ? clean.map(name => name.split("/").slice(1).join("/")) : clean;
  }

  function unsafePaths(names) {
    return names.filter(name => {
      const normalized = name.replaceAll("\\", "/");
      return normalized.startsWith("/") || /^[A-Za-z]:\//.test(normalized) || normalized.split("/").includes("..");
    });
  }

  function setList(element, items, emptyText) {
    element.replaceChildren();
    const values = items.length ? items : [emptyText];
    values.forEach(value => {
      const item = document.createElement("li");
      item.textContent = value;
      element.append(item);
    });
  }

  function setStatus(verdict) {
    badge.className = "registry-badge";
    if (verdict === "PASS") {
      badge.classList.add("documented");
      badge.textContent = "Pass";
    } else if (verdict === "PASS_WITH_WARNINGS") {
      badge.classList.add("pending");
      badge.textContent = "Warnings";
    } else {
      badge.classList.add("failed");
      badge.textContent = "Fail";
    }
  }

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    report = null;
    downloadButton.disabled = true;
    findings.hidden = true;
    if (!file) {
      fileName.textContent = "No package selected.";
      verifyButton.disabled = true;
      return;
    }
    fileName.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
    verifyButton.disabled = false;
    title.textContent = "Ready to inspect";
    summary.textContent = "Run the preflight to calculate the artifact hash and inspect its structure.";
  });

  verifyButton.addEventListener("click", async () => {
    const file = input.files?.[0];
    if (!file) return;
    verifyButton.disabled = true;
    downloadButton.disabled = true;
    title.textContent = "Inspecting package…";
    summary.textContent = "Calculating SHA-256 and reading the ZIP directory.";

    try {
      const buffer = await file.arrayBuffer();
      const [digest, names] = await Promise.all([
        crypto.subtle.digest("SHA-256", buffer),
        Promise.resolve().then(() => readZipEntries(buffer))
      ]);
      const hash = hex(digest);
      const unsafe = unsafePaths(names);
      const normalized = normalizedNames(names);
      const present = requiredFiles.filter(name => normalized.includes(name));
      const missing = requiredFiles.filter(name => !normalized.includes(name));
      const duplicates = normalized.filter((name, index) => normalized.indexOf(name) !== index);
      let verdict = "PASS";
      const warnings = [];

      if (unsafe.length || missing.includes("artifact-manifest.json") || missing.includes("approval-rules.md")) {
        verdict = "FAIL";
      } else if (missing.length || duplicates.length) {
        verdict = "PASS_WITH_WARNINGS";
      }
      if (missing.length) warnings.push(`Missing ${missing.length} required file(s).`);
      if (duplicates.length) warnings.push(`Found ${new Set(duplicates).size} duplicate path(s).`);
      if (unsafe.length) warnings.push(`Found ${unsafe.length} unsafe path(s).`);

      report = {
        report_type: "workflowware_local_package_preflight",
        report_version: "0.1",
        generated_at: new Date().toISOString(),
        certification: false,
        file: { name: file.name, size_bytes: file.size, sha256: hash },
        zip: { entry_count: names.length, unsafe_paths: unsafe, duplicate_paths: [...new Set(duplicates)] },
        required_files: { expected: requiredFiles, present, missing },
        verdict,
        warnings,
        limitations: [
          "Local structural preflight only.",
          "Does not validate decompressed manifest content.",
          "Does not execute evaluations.",
          "Does not verify runtime receipts or independent certification."
        ]
      };

      setStatus(verdict);
      title.textContent = verdict === "PASS" ? "Structure present" : verdict === "FAIL" ? "Package failed preflight" : "Package needs review";
      summary.textContent = warnings.length ? warnings.join(" ") : "All required package paths are present and no unsafe ZIP paths were detected.";
      hashValue.textContent = hash;
      entryCount.textContent = String(names.length);
      requiredCount.textContent = `${present.length} / ${requiredFiles.length}`;
      unsafeCount.textContent = String(unsafe.length);
      setList(presentList, present, "None");
      setList(missingList, missing, "No required files missing");
      findings.hidden = false;
      downloadButton.disabled = false;
    } catch (error) {
      report = {
        report_type: "workflowware_local_package_preflight",
        report_version: "0.1",
        generated_at: new Date().toISOString(),
        certification: false,
        verdict: "FAIL",
        error: error instanceof Error ? error.message : "Unknown verification error"
      };
      setStatus("FAIL");
      title.textContent = "Unable to inspect package";
      summary.textContent = report.error;
      hashValue.textContent = "Not calculated";
      entryCount.textContent = "—";
      requiredCount.textContent = "—";
      unsafeCount.textContent = "—";
      downloadButton.disabled = false;
    } finally {
      verifyButton.disabled = false;
    }
  });

  downloadButton.addEventListener("click", () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2) + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "workflowware-preflight-report.json";
    link.click();
    URL.revokeObjectURL(url);
  });
})();
