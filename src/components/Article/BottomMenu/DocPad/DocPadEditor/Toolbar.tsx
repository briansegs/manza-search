import React from 'react'

const Toolbar: React.FC = () => {
  return (
    <div
      id="custom-toolbar"
      className="grid h-fit w-32 grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-1"
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
      <select className="ql-header col-span-full w-full">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
        <option value="6" />
      </select>

      <select className="ql-size col-span-full w-full">
        <option value="small" />
        <option value="large" />
        <option value="huge" />
      </select>

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
