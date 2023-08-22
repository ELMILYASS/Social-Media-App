// async function promise(a) {
//   if (a == 0) return a;
//   else throw new Error("Error");
// }

// // promise(0)
// //   .then((data) => console.log(data))
// //   .catch((err) => console.log(err.message));

// async function pr() {
//   try {
//     const res = await promise(10);
//     return res; //it's the result of the promise function
//   } catch (err) {
//     console.log("error: ", err.message);
//   }
// }

// const res = pr(); // it's a promise
// res.then((data) => console.log(data)); // result is 0 or undefined because pr doesn't throw an error
// // function resolve()

// console.log("ilas".startsWith(" "));

// const array = undefined;

// const p = array.map((e) => console.log(e));

// console.log(p);

// let array = ["ilyass", "ilyass2"];

// console.log(array.re)

// let array = undefined;

// for (e of array) {
//   console.log(e);
// }

// array.forEach((e) => console.log(e));
// let array = [];

// console.log(
//   array.reduce((prev, current) => {
//     console.log("prev", prev);
//     console.log("current", current);
//     console.log("result ", prev + current?.id);
//     return prev + current.id;
//   }, 0)
// );

// let obj = [
//   { name: "ilyas", age: "18" },
//   { name: "yos", age: "20" },
//   { name: "a", age: "10" },
// ];

// console.log(obj.sort((a, b) => a.age - b.age));

// function TimePassed(createdAt) {
//   const currentTime = new Date();
//   const timeDifference = currentTime - createdAt; //ms

//   const seconds = Math.floor(timeDifference / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const months = Math.floor(days / 30); // Approximate months

//   if (months > 0) {
//     return `${months} ${months === 1 ? "month" : "months"} left`;
//   } else if (days > 0) {
//     return `${days} ${days === 1 ? "day" : "days"} left`;
//   } else if (hours > 0) {
//     return `${hours} ${hours === 1 ? "hour" : "hours"} left`;
//   } else if (minutes > 0) {
//     return `${minutes} ${minutes === 1 ? "minute" : "minutes"} left`;
//   } else {
//     return "Just now";
//   }
// }
// const a = new Date(Number("1692267452000")); //ms

// console.log(TimePassed(a));

// const a = [
//   { id: 5, name: "ilyass" },
//   { id: 6, name: "usra" },
// ];

// console.log(a.find((item) => item.id === 7));
console.log("2023-08-22T00:00:00.000+00:00".slice(0, 10))

