const reportWebVitals = (
  onPerfEntry,
  loadWebVitals = () => import("web-vitals")
) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    loadWebVitals().then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
