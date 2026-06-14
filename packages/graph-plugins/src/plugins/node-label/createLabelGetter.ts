type CreateLabelGetterOptions = {
  getLabels: () => string[];
  sequence: string[];
};

/**
 * @example const labelGetter = createLabelGetter({ getLabels: () => activeLabels, sequence: "ABC" });
 *  const newLabel = labelGetter();
 *  console.log(newLabel); // "A"
 *  // add "A" to activeLabels
 *  console.log(newLabel); // "B"
 *  // remove "A" from activeLabels
 *  console.log(newLabel); // "A"
 */
export const createLabelGetter =
  ({ getLabels, sequence }: CreateLabelGetterOptions) =>
  () => {
    let labels = getLabels();

    let timesAround = 0;
    let index = 0;
    let newLabel;

    const getPrefix = () => {
      if (timesAround === 0) return '';
      return sequence[(timesAround - 1) % sequence.length];
    };

    while (!newLabel) {
      const indexOutOfBounds = index >= sequence.length;
      if (indexOutOfBounds) {
        labels = labels.slice(sequence.length);
        index = 0;
        timesAround++;
      }
      const potentialLabel = getPrefix() + sequence[index];
      const labelExists = labels.includes(potentialLabel);
      if (!labelExists) newLabel = potentialLabel;
      index++;
    }

    return newLabel;
  };
