import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Router>
                <Routes element={<AuthLayout />}>
                    <Route element={<Login />} />
                    <Route element={<Signup />} />
                </Routes>
                
                <Routes element={<HomeLayout />}>
                    <Route element={<Dashboard />} />
                    <Route element={<Attendance />} />
                </Routes>
            </Router>
        </>
    )
};

// const App = () => {
//     const contacts = [];
//     return (
//         <>  
//             <Router>
//                 {/* navbar harus dalem BrowserRouter biar bisa didestructure */}
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" exact element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact contacts={contacts} />} />
//                     <Route path="/comment" element={<RandomComments />} />
//                     <Route path="/image-search" element={<ImageSearch />} />
//                     <Route path="/video-search" element={<VideoSearch />} />
//                     <Route path="/playground" element={<Playground />} />
//                     <Route path="/redux-counter" element={<Counter />} />
//                 </Routes>
//             </Router>
//         </>
//     )
// }

export default App;