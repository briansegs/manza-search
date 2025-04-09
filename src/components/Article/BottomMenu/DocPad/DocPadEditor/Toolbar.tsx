import React from 'react'

const Toolbar: React.FC = () => {
  return (
    <div
      id="custom-toolbar"
      className="grid h-fit w-32 grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))]"
    >
      {/* Toggle buttons */}
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />

      {/* Dropdowns */}
      <select className="ql-color" />
      <select className="ql-background" />

      {/* Clean format */}
      <button className="ql-clean" />

      {/* Dropdowns */}
      <select className="ql-header col-span-full w-full" />

      <select className="ql-size col-span-full w-full" />

      <select className="ql-font col-span-full w-full" />

      <button className="ql-strike" />

      <button className="ql-blockquote" />
      <button className="ql-code-block" />

      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-formula" />

      {/* Custom buttons */}
      <button className="ql-script" value="sub" />
      <button className="ql-script" value="super" />

      <select className="ql-align" />

      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />

      <button className="ql-direction" value="rtl" />

      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-list" value="check" />
    </div>
  )
}

export default Toolbar
