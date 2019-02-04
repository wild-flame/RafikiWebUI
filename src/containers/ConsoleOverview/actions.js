export const Types = {
  DRAWER_TOGGLE: "ConsoleOverview/drawer_toggle",
  CHANGE_HEADER_TITLE: "ConsoleOverview/change_header_title"
}

export const handleDrawerToggle = () => ({
  type: Types.DRAWER_TOGGLE
})

export const handleHeaderTitleChange = headerTitle => ({
  type: Types.CHANGE_HEADER_TITLE,
  headerTitle
})