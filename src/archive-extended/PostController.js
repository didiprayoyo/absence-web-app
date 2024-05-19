// Extended TODO: Post Forum CRUD
// TODO: getPosts in AuthHandler or move to UserHandler
const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

const getPosts = (req, res) => {
  return res.json(posts.filter((post) => post.username === req.user.name));
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

authRouter.post("/token", postToken);
authRouter.get("/posts", authenticateToken, getPosts);
app.get("/", checkAuthenticated, (req, res) => {
  res.json({ message: "Already authenticated", render: "Go to home page" });
});
