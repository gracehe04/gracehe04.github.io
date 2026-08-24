const clampChannel = (v) => Math.max(0, Math.min(255, Math.round(v)));

const toChannels = (hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const fromChannels = (channels) =>
  `#${channels
    .map(clampChannel)
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;

const mapChannels = (hex, fn) => fromChannels(toChannels(hex).map(fn));

export const lighten = (hex, amount = 0.25) =>
  mapChannels(hex, (v) => v + (255 - v) * amount);

export const darken = (hex, amount = 0.25) =>
  mapChannels(hex, (v) => v * (1 - amount));

export const hexLabel = (hex) => hex.replace("#", "").toUpperCase();

export const setCssVars = (vars) => {
  Object.entries(vars).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
};
