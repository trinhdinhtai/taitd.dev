export function LogoMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 576 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0H192V64H256V192H192V256H0ZM64 64H192V192H64ZM320 0H576V64H480V256H416V64H320Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 576 256"><path fill="currentColor" fill-rule="evenodd" d="M0 0H192V64H256V192H192V256H0ZM64 64H192V192H64ZM320 0H576V64H480V256H416V64H320Z"/></svg>`
}
