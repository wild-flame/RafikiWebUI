export const Types = {
  DRAWER_TOGGLE: "ConsoleAppFrame/drawer_toggle",
  CHANGE_HEADER_TITLE: "ConsoleAppFrame/change_header_title"
}

export const handleDrawerToggle = () => ({
  type: Types.DRAWER_TOGGLE
})

export const handleHeaderTitleChange = headerTitle => ({
  type: Types.CHANGE_HEADER_TITLE,
  headerTitle
})