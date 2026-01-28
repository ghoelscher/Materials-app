const materials = [
  {
    id: "silicon",
    name: "Silicon",
    formula: "Si",
    description:
      "Cubic diamond structure with strong covalent bonding. A workhorse semiconductor with a well-known indirect band gap.",
    crystalSystem: "Cubic (diamond)",
    latticeParameters: { a: 5.43, b: 5.43, c: 5.43, alpha: 90, beta: 90, gamma: 90 },
    properties: {
      density: "2.33 g/cm³",
      bandGap: "1.12 eV (indirect)",
      thermalConductivity: "149 W/m·K",
      coordination: "Tetrahedral (4)",
    },
    basis: [
      { element: "Si", position: [0, 0, 0] },
      { element: "Si", position: [0.25, 0.25, 0.25] },
      { element: "Si", position: [0.5, 0.5, 0] },
      { element: "Si", position: [0.75, 0.75, 0.25] },
      { element: "Si", position: [0.5, 0, 0.5] },
      { element: "Si", position: [0.75, 0.25, 0.75] },
      { element: "Si", position: [0, 0.5, 0.5] },
      { element: "Si", position: [0.25, 0.75, 0.75] },
    ],
    peaks: [
      { twoTheta: 28.4, intensity: 100, hkl: "111" },
      { twoTheta: 47.3, intensity: 60, hkl: "220" },
      { twoTheta: 56.1, intensity: 45, hkl: "311" },
      { twoTheta: 69.1, intensity: 30, hkl: "400" },
    ],
  },
  {
    id: "sodium-chloride",
    name: "Sodium Chloride",
    formula: "NaCl",
    description:
      "Rock-salt structure with ionic bonding. Each ion is octahedrally coordinated, making it a classic example of close-packed lattices.",
    crystalSystem: "Cubic (rock-salt)",
    latticeParameters: { a: 5.64, b: 5.64, c: 5.64, alpha: 90, beta: 90, gamma: 90 },
    properties: {
      density: "2.17 g/cm³",
      bandGap: "8.5 eV",
      thermalConductivity: "6.5 W/m·K",
      coordination: "Octahedral (6)",
    },
    basis: [
      { element: "Na", position: [0, 0, 0] },
      { element: "Na", position: [0, 0.5, 0.5] },
      { element: "Na", position: [0.5, 0, 0.5] },
      { element: "Na", position: [0.5, 0.5, 0] },
      { element: "Cl", position: [0.5, 0.5, 0.5] },
      { element: "Cl", position: [0.5, 0, 0] },
      { element: "Cl", position: [0, 0.5, 0] },
      { element: "Cl", position: [0, 0, 0.5] },
    ],
    peaks: [
      { twoTheta: 27.3, intensity: 65, hkl: "111" },
      { twoTheta: 31.7, intensity: 100, hkl: "200" },
      { twoTheta: 45.5, intensity: 40, hkl: "220" },
      { twoTheta: 53.9, intensity: 28, hkl: "311" },
    ],
  },
  {
    id: "graphite",
    name: "Graphite",
    formula: "C",
    description:
      "Layered hexagonal structure with strong in-plane covalent bonds and weak interlayer van der Waals interactions.",
    crystalSystem: "Hexagonal",
    latticeParameters: { a: 2.46, b: 2.46, c: 6.71, alpha: 90, beta: 90, gamma: 120 },
    properties: {
      density: "2.26 g/cm³",
      bandGap: "0 eV (semi-metal)",
      thermalConductivity: "200 W/m·K (in-plane)",
      coordination: "Trigonal planar (3)",
    },
    basis: [
      { element: "C", position: [0, 0, 0] },
      { element: "C", position: [1 / 3, 2 / 3, 0] },
      { element: "C", position: [0, 0, 0.5] },
      { element: "C", position: [1 / 3, 2 / 3, 0.5] },
    ],
    peaks: [
      { twoTheta: 26.6, intensity: 100, hkl: "002" },
      { twoTheta: 42.4, intensity: 35, hkl: "100" },
      { twoTheta: 44.5, intensity: 25, hkl: "101" },
      { twoTheta: 54.6, intensity: 20, hkl: "004" },
    ],
  },
  {
    id: "titanium-dioxide",
    name: "Titanium Dioxide",
    formula: "TiO₂ (rutile)",
    description:
      "Tetragonal rutile structure used in photocatalysis and pigments. Features TiO6 octahedra sharing edges along the c-axis.",
    crystalSystem: "Tetragonal (rutile)",
    latticeParameters: { a: 4.59, b: 4.59, c: 2.96, alpha: 90, beta: 90, gamma: 90 },
    properties: {
      density: "4.23 g/cm³",
      bandGap: "3.0 eV",
      thermalConductivity: "8.4 W/m·K",
      coordination: "Octahedral (6)",
    },
    basis: [
      { element: "Ti", position: [0, 0, 0] },
      { element: "Ti", position: [0.5, 0.5, 0.5] },
      { element: "O", position: [0.305, 0.305, 0] },
      { element: "O", position: [0.695, 0.695, 0] },
      { element: "O", position: [0.195, 0.805, 0.5] },
      { element: "O", position: [0.805, 0.195, 0.5] },
    ],
    peaks: [
      { twoTheta: 27.4, intensity: 100, hkl: "110" },
      { twoTheta: 36.1, intensity: 48, hkl: "101" },
      { twoTheta: 41.2, intensity: 35, hkl: "111" },
      { twoTheta: 54.3, intensity: 25, hkl: "211" },
    ],
  },
];

const elementColors = {
  Si: "#5f88ff",
  Na: "#ffb443",
  Cl: "#7fe3a7",
  C: "#495057",
  Ti: "#f77f7f",
  O: "#ff6b6b",
};
