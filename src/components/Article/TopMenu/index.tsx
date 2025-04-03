import scrollToTop from '@/utilities/scrollToTop'
import React from 'react'
import MenuButton from '../MenuButton'

interface TopMenu {
  styles?: string
}

const TopMenu: React.FC<TopMenu> = ({ styles }) => (
  <div className={`${styles} flex`}>
    <MenuButton onClick={scrollToTop}>TOP</MenuButton>
    <MenuButton>HIGHLIGHT</MenuButton>
    <MenuButton>LOVE</MenuButton>
    <MenuButton>PIN</MenuButton>
    <MenuButton>SAVE</MenuButton>
    <MenuButton>History</MenuButton>
    <MenuButton>RM</MenuButton>
    <MenuButton>LIST</MenuButton>

    <MenuButton dark>SHARE</MenuButton>
  </div>
)

export default TopMenu
