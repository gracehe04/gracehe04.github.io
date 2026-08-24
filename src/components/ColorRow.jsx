import { hexLabel } from "../utils/color";

/**
 * One row of the design panel's color list. Renders a read-only swatch when
 * onChange is omitted, otherwise a native color input behind the swatch.
 */
function ColorRow({ label, value, onChange }) {
  const swatch = <div className="color-swatch-preview" style={{ background: value }} />;

  return (
    <div className="color-row">
      {onChange ? (
        <label className="color-input-wrapper">
          {swatch}
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="color-input-hidden"
          />
        </label>
      ) : (
        swatch
      )}
      <span className="color-hex">{hexLabel(value)}</span>
      <span className="color-opacity">{label}</span>
    </div>
  );
}

export default ColorRow;
