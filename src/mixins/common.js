export function toggleViewAndScrollBody(flag) {
  if (flag) document.body.classList.add('noscroll');
  else document.body.classList.remove('noscroll');
  return flag;
}
