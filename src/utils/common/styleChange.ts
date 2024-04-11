export const shodowRoot = (rootEl: string, targetEl: string, classObject: any) => {
  // (document.querySelectorAll(".myToastStyle")[0].shadowRoot as any).querySelector(".toast-message").style.border = "1px solid red";
  document.querySelectorAll(rootEl).forEach(element => {
    for (const key in classObject) {
      (element.shadowRoot as any).querySelector(targetEl).style[key] = classObject[key];
    }
  })

}