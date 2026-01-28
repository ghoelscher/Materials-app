const materialSelect = document.getElementById("materialSelect");
const planeSelect = document.getElementById("planeSelect");
const cutoffRange = document.getElementById("cutoffRange");
const cutoffValue = document.getElementById("cutoffValue");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

const structureCanvas = document.getElementById("structureCanvas");
const ctx = structureCanvas.getContext("2d");

const materialSummary = document.getElementById("materialSummary");
const propertyCards = document.getElementById("propertyCards");
const basisTable = document.getElementById("basisTable");
const cellParameters = document.getElementById("cellParameters");
const elementLegend = document.getElementById("elementLegend");
const coordinationSummary = document.getElementById("coordinationSummary");
const neighborTable = document.getElementById("neighborTable");
const diffractionChart = document.getElementById("diffractionChart");

const state = {
  material: materials[0],
  plane: "ab",
  cutoff: parseFloat(cutoffRange.value),
};

const planeMap = {
  ab: [0, 1],
  ac: [0, 2],
  bc: [1, 2],
};

const projectIsometric = (position, width, height, padding) => {
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;
  const [x, y, z] = position;
  const isoX = (x - y) * 0.6;
  const isoY = (x + y) * 0.35 - z * 0.75;
  const centeredX = padding + plotWidth / 2 + isoX * plotWidth;
  const centeredY = padding + plotHeight / 2 + isoY * plotHeight;
  return [centeredX, centeredY, z];
};

const formatNumber = (value) => value.toFixed(2);

const positionDistance = (a, b, lattice) => {
  const delta = a.map((value, index) => {
    const diff = value - b[index];
    return diff - Math.round(diff);
  });
  const [ax, by, cz] = [lattice.a, lattice.b, lattice.c];
  return Math.sqrt(
    Math.pow(delta[0] * ax, 2) +
      Math.pow(delta[1] * by, 2) +
      Math.pow(delta[2] * cz, 2)
  );
};

const buildMaterialOptions = () => {
  materials.forEach((material) => {
    const option = document.createElement("option");
    option.value = material.id;
    option.textContent = `${material.name} (${material.formula})`;
    materialSelect.appendChild(option);
  });
};

const renderOverview = () => {
  const { material } = state;
  materialSummary.innerHTML = `
    <h2>${material.name}</h2>
    <p>${material.description}</p>
    <div class="summary-grid">
      <p><strong>Formula:</strong> ${material.formula}</p>
      <p><strong>Crystal system:</strong> ${material.crystalSystem}</p>
    </div>
  `;

  propertyCards.innerHTML = `
    <h2>Key properties</h2>
    <ul>
      <li><strong>Density:</strong> ${material.properties.density}</li>
      <li><strong>Band gap:</strong> ${material.properties.bandGap}</li>
      <li><strong>Thermal conductivity:</strong> ${material.properties.thermalConductivity}</li>
      <li><strong>Coordination:</strong> ${material.properties.coordination}</li>
    </ul>
  `;

  const basisRows = material.basis
    .map(
      (site, index) => `
      <div class="table-row">
        <span>${index + 1}</span>
        <span>${site.element}</span>
        <span>${site.position.map((coord) => formatNumber(coord)).join(", ")}</span>
        <span>${elementColors[site.element] ? "" : "Custom"}</span>
      </div>
    `
    )
    .join("");

  basisTable.innerHTML = `
    <h2>Basis atoms (fractional coordinates)</h2>
    <div class="table">
      <div class="table-row header">
        <span>#</span>
        <span>Element</span>
        <span>Position (x, y, z)</span>
        <span>Note</span>
      </div>
      ${basisRows}
    </div>
  `;
};

const renderCellParameters = () => {
  const lattice = state.material.latticeParameters;
  cellParameters.innerHTML = `
    <ul>
      <li><strong>a:</strong> ${lattice.a} Å</li>
      <li><strong>b:</strong> ${lattice.b} Å</li>
      <li><strong>c:</strong> ${lattice.c} Å</li>
      <li><strong>α:</strong> ${lattice.alpha}°</li>
      <li><strong>β:</strong> ${lattice.beta}°</li>
      <li><strong>γ:</strong> ${lattice.gamma}°</li>
    </ul>
  `;

  const elements = [...new Set(state.material.basis.map((atom) => atom.element))];
  elementLegend.innerHTML = elements
    .map(
      (element) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${elementColors[element] || "#999"}"></span>
        ${element}
      </div>
    `
    )
    .join("");
};

const renderStructure = () => {
  const { basis } = state.material;
  const width = structureCanvas.width;
  const height = structureCanvas.height;
  ctx.clearRect(0, 0, width, height);

  const padding = 40;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  ctx.strokeStyle = "#cbd5f0";
  ctx.lineWidth = 2;
  ctx.strokeRect(padding, padding, plotWidth, plotHeight);

  const atomsWithProjection = basis.map((atom) => {
    if (state.plane === "3d") {
      const [x, y, z] = projectIsometric(atom.position, width, height, padding);
      return { atom, x, y, depth: z };
    }

    const planeIndices = planeMap[state.plane];
    const x = padding + atom.position[planeIndices[0]] * plotWidth;
    const y = padding + (1 - atom.position[planeIndices[1]]) * plotHeight;
    return { atom, x, y, depth: 0 };
  });

  atomsWithProjection
    .sort((a, b) => a.depth - b.depth)
    .forEach(({ atom, x, y, depth }) => {
      const radius = state.plane === "3d" ? 8 + depth * 6 : 10;
      ctx.beginPath();
      ctx.fillStyle = elementColors[atom.element] || "#999";
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1b1f2a";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

  ctx.fillStyle = "#1b1f2a";
  ctx.font = "14px Inter";
  const label = state.plane === "3d" ? "3D projection" : `Plane: ${state.plane.toUpperCase()}`;
  ctx.fillText(label, padding, height - 15);
};

const renderCoordination = () => {
  const { basis, latticeParameters } = state.material;
  const cutoff = state.cutoff;

  const neighborList = [];
  basis.forEach((atom, index) => {
    basis.forEach((other, otherIndex) => {
      if (index === otherIndex) return;
      const distance = positionDistance(atom.position, other.position, latticeParameters);
      if (distance <= cutoff) {
        neighborList.push({
          atom: `${atom.element} (${index + 1})`,
          neighbor: `${other.element} (${otherIndex + 1})`,
          distance,
        });
      }
    });
  });

  const averageCoordination = (
    neighborList.length / Math.max(basis.length, 1)
  ).toFixed(1);

  coordinationSummary.innerHTML = `
    <p><strong>Cutoff radius:</strong> ${cutoff.toFixed(1)} Å</p>
    <p><strong>Average coordination:</strong> ${averageCoordination}</p>
    <p><strong>Total neighbor pairs:</strong> ${neighborList.length}</p>
  `;

  neighborTable.innerHTML = `
    <div class="table">
      <div class="table-row header">
        <span>Atom</span>
        <span>Neighbor</span>
        <span>Distance (Å)</span>
        <span>Bond type</span>
      </div>
      ${neighborList
        .slice(0, 24)
        .map(
          (pair) => `
            <div class="table-row">
              <span>${pair.atom}</span>
              <span>${pair.neighbor}</span>
              <span>${pair.distance.toFixed(2)}</span>
              <span>${pair.distance < cutoff * 0.7 ? "Strong" : "Weak"}</span>
            </div>
          `
        )
        .join("")}
    </div>
    <p class="hint">Showing first 24 neighbor pairs within cutoff.</p>
  `;
};

const renderDiffraction = () => {
  const { peaks } = state.material;
  const padding = 40;
  const chartWidth = 800 - padding * 2;
  const chartHeight = 240 - padding * 2;

  const maxIntensity = Math.max(...peaks.map((peak) => peak.intensity));

  const bars = peaks
    .map((peak) => {
      const x = padding + (peak.twoTheta / 90) * chartWidth;
      const height = (peak.intensity / maxIntensity) * chartHeight;
      return `
        <g>
          <line x1="${x}" y1="${padding + chartHeight}" x2="${x}" y2="${padding + chartHeight - height}" stroke="#3c6df0" stroke-width="8" stroke-linecap="round" />
          <text x="${x}" y="${padding + chartHeight + 18}" text-anchor="middle" font-size="12" fill="#5b6374">${peak.hkl}</text>
        </g>
      `;
    })
    .join("");

  diffractionChart.innerHTML = `
    <rect x="${padding}" y="${padding}" width="${chartWidth}" height="${chartHeight}" fill="none" stroke="#cbd5f0" stroke-dasharray="4 4" />
    <text x="${padding}" y="${padding - 10}" font-size="12" fill="#5b6374">Intensity</text>
    <text x="${padding + chartWidth}" y="${padding + chartHeight + 30}" text-anchor="end" font-size="12" fill="#5b6374">2θ (degrees)</text>
    ${bars}
  `;
};

const updateAll = () => {
  renderOverview();
  renderCellParameters();
  renderStructure();
  renderCoordination();
  renderDiffraction();
};

materialSelect.addEventListener("change", (event) => {
  const selected = materials.find((material) => material.id === event.target.value);
  if (selected) {
    state.material = selected;
    updateAll();
  }
});

planeSelect.addEventListener("change", (event) => {
  state.plane = event.target.value;
  renderStructure();
});

cutoffRange.addEventListener("input", (event) => {
  state.cutoff = parseFloat(event.target.value);
  cutoffValue.textContent = state.cutoff.toFixed(1);
  renderCoordination();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((button) => button.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

buildMaterialOptions();
materialSelect.value = state.material.id;
cutoffValue.textContent = state.cutoff.toFixed(1);
updateAll();
