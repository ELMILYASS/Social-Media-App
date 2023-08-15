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

let array = [];

for (e of array) {
  console.log(e);
}
