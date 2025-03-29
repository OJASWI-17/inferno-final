// export default function Button({ text }) {
//     return (
//         <div className="flex justify-center items-center">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//                 {text}
//             </button>
//         </div>
//     );
// }


// In your Button component file
export default function Button({ text, onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={`${className} transition-colors duration-200`}
      >
        {text}
      </button>
    );
  }