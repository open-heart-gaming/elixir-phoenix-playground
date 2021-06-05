let DynamicStyle = {
  mounted() {
    this.handleEvent('change_size', ({ size }) => {
      const shape = document.getElementById('resize_shape');
      shape.style.height = px(size);
      shape.style.width = px(size);
    });
  },
};

const px = (val) => `${val}px`;

export { DynamicStyle };
