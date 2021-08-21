export default function createOptions(optionArray) {
  const optionsReady = [];
  optionArray.map((singleOption) =>
    optionsReady.push(
      <option value={singleOption.toUpperCase()}>{singleOption}</option>
    )
  );
  return optionsReady;
}
