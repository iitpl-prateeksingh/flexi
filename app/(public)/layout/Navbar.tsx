// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { FiUser, FiMenu, FiX } from "react-icons/fi";

// export default function Navbar({ data }: any) {
//   const [open, setOpen] = useState(false);
//   console.log("data of setting in navbar", data)

//   return (
//     <>
//       {/* NAVBAR */}
//       <header className="absolute top-0 left-0 w-full z-50 animate__animated animate__fadeInDown">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <Link href="/">
//             <img src={data?.logo} alt="Flexi Capital" className="h-12" />
//           </Link>

//           <div
//             className="hidden md:block"
//             style={{
//               background: "#dbdbdb",
//               height: "0.5px",
//               // width: "27%",
//               width: "50%",
//               opacity: "0.7",
//             }}
//           ></div>

//           <nav className="hidden lg:flex items-center gap-6 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white shadow-lg">
//             <NavLinks />
//             {/* <Profile /> */}
//             <CTA />
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setOpen(true)}
//             className="lg:hidden text-white text-2xl"
//           >
//             <FiMenu />
//           </button>
//         </div>
//       </header>

//       {/* BACKDROP */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* DRAWER */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-72 bg-[#fffaf3] z-50 transform transition-transform duration-300
//         ${open ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="p-5 flex items-center justify-between border-b border-b-orange-200">
//           {/* <span className="font-semibold text-lg">Menu</span> */}
//           <img src={data?.logo} alt="" className="w-15" />
//           <button onClick={() => setOpen(false)} className="text-2xl closeBtn">
//             <FiX />
//           </button>
//         </div>

//         <div className="flex flex-col p-5 gap-5">
//           <DrawerLink label="About us" url="/aboutus" />
//           <DrawerLink label="Services" url="/services" />
//           <DrawerLink label="Interviews" url="/interviews" />
//           {/* <DrawerLink label="Contact us" url="contactus" />
//           <DrawerLink label="Careers" url="#" /> */}

//           {/* <Link
//             href="/login"
//             className="flex items-center gap-2 text-orange-500 font-medium"
//           >
//             <FiUser />
//             Profile Log in
//           </Link> */}

//           {/* <Link
//             href="/consultation"
//             className="mt-4 bg-orange-400 text-white text-center py-3 rounded-full font-medium hover:bg-orange-500 transition"
//           >
//             Book a Consultation
//           </Link> */}
//           <Link
//             href="/contactus"
//             className="mt-4 bg-orange-400 text-white text-center py-3 rounded-full font-medium hover:bg-orange-500 transition"
//           >
//             Contact us
//           </Link>
//         </div>
//       </aside>
//     </>
//   );
// }

// /* ---------- Sub Components ---------- */

// function NavLinks() {
//   return (
//     <>
//       <Link href="/interviews" className="hover:text-orange-400">
//         Interviews
//       </Link>
//       <Link href="/aboutus" className="hover:text-orange-400">
//         About us
//       </Link>
//       <Link href="/services" className="hover:text-orange-400">
//         Services
//       </Link>
    
//       {/* <Link href="contactus" className="hover:text-orange-400">
//         Contact us
//       </Link> */}
//       {/* <Link href="#careers" className="hover:text-orange-400">
//         Careers
//       </Link> */}
//     </>
//   );
// }

// function Profile() {
//   return (
//     <Link
//       href="/login"
//       className="flex items-center gap-1 text-orange-400 hover:text-orange-300"
//     >
//       <FiUser />
//       Profile Log in
//     </Link>
//   );
// }

// function CTA() {
//   return (
//     // <Link
//     //   href="/consultation"
//     //   className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-medium transition"
//     // >
//     //   Book a Consultation
//     // </Link>
//     <Link
//       href="/contactus"
//       className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-medium transition"
//     >
//       Contact us
//     </Link >
//   );
// }

// function DrawerLink({ label, url }: { label: string; url: string }) {
//   return (
//     <Link
//       href={url}
//       className="text-gray-700 text-lg hover:text-orange-500 transition"
//     >
//       {label}
//     </Link>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser, FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ data }: any) {
  const [open, setOpen] = useState(false);
  console.log("data of setting in navbar", data);

  return (
    <>
      {/* NAVBAR */}
      <header className="absolute top-0 left-0 w-full z-50 animate__animated animate__fadeInDown">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src={data?.logo} alt="Flexi Capital" className="h-12" />
          </Link>

          <div
            className="hidden md:block"
            style={{
              background: "#dbdbdb",
              height: "0.5px",
              width: "50%",
              opacity: "0.7",
            }}
          ></div>

          <nav className="hidden lg:flex items-center gap-6 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white shadow-lg">
            <NavLinks />
            {/* <Profile /> */}
            <CTA />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-[#fffaf3] z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex items-center justify-between border-b border-b-orange-200">
          <img src={data?.logo} alt="" className="w-15" />
          <button onClick={() => setOpen(false)} className="text-2xl closeBtn">
            <FiX />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-5">
          {/* Passed setOpen so the drawer closes when a link is clicked */}
          <DrawerLink label="About us" url="/aboutus" onClick={() => setOpen(false)} />
          <DrawerLink label="Services" url="/services" onClick={() => setOpen(false)} />
          <DrawerLink label="Interviews" url="/interviews" onClick={() => setOpen(false)} />

          <Link
            href="/contactus"
            onClick={() => setOpen(false)}
            className="mt-4 bg-orange-400 text-white text-center py-3 rounded-full font-medium hover:bg-orange-500 transition"
          >
            Contact us
          </Link>
        </div>
      </aside>
    </>
  );
}

/* ---------- Sub Components ---------- */

function NavLinks() {
  const pathname = usePathname();

  // Helper array to keep the code clean
  const links = [
    { label: "Interviews", url: "/interviews" },
    { label: "About us", url: "/aboutus" },
    { label: "Services", url: "/services" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.url;
        return (
          <Link
            key={link.url}
            href={link.url}
            className={`hover:text-orange-400 transition-colors ${
              isActive ? "text-orange-400 font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

function Profile() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-1 text-orange-400 hover:text-orange-300"
    >
      <FiUser />
      Profile Log in
    </Link>
  );
}

function CTA() {
  return (
    <Link
      href="/contactus"
      className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-medium transition"
    >
      Contact us
    </Link>
  );
}

function DrawerLink({ label, url, onClick }: { label: string; url: string; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      onClick={onClick}
      className={`text-lg transition hover:text-orange-500 ${
        isActive ? "text-orange-500 font-semibold" : "text-gray-700"
      }`}
    >
      {label}
    </Link>
  );
}