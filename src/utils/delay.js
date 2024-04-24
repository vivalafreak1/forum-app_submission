export default function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
