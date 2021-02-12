export const custom = {
  normalize: function(input) {
    return input
      .split(" ")
      .reduce((output, item) => {
        return [
          ...output,
          item
            .normalize("NFD")
            .replace(/[^a-zA-Zs]/g, "")
            .toLowerCase()
        ];
      }, [])
      .join(" ");
  }
};
