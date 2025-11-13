React.useEffect(() => {
  loadState().then(saved => {
    if (saved) setData(saved);
    else {
      const base = import.meta.env.BASE_URL;

      setData({
        name: "Full Name",
        title: "Designation",
        phone: "+91 123456789",
        email: "you@company.com",
        images: {
          leftBlock: base + "left.gif",
          icons: [
            base + "icons/facebook.png",
            base + "icons/linkedin.png",
            base + "icons/youtube.png"
          ]
        },
        accent: "#00E785"
      });
    }
  });
}, []);
