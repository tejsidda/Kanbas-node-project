const module = {
    id: "123", name: "Web Development",
    description: "Web Development coursework",
    course: "HTML/CSS"
  };
  export default function WorkingWithModule(app) {
    app.get("/lab5/module", (req, res) => {
      res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });    
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
  };
  