// IN AUTH ROUTER

// handle this page in frontend Routes
// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// });

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     })
//     res.redirect('/login')
//     } catch {
//     res.redirect('/register')
//     }
// })

// IN AUTH HANDLER
// Using Passport: handle this in frontend react-router instead
// const checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.json({ message: "Not authenticated", render: "Go to login page" });
// };

// const checkNotAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.json({
//       message: "Already authenticated",
//       render: "Go to home page",
//     });
//   }
//   next();
// };
