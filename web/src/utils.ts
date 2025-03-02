export const MIN_TEXT_AREA_HEIGHT = 62
export const TOTAL_TEXT_AREA_NON_TEXT_HEIGHT = 16

export function autoGrowTextArea(
  element: React.ChangeEvent<HTMLTextAreaElement>,
  setTextAreaHeight: React.Dispatch<React.SetStateAction<number>>
) {
  element.target.style.height = '0px'
  setTextAreaHeight(
    element.target.scrollHeight + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT
  )
  element.target.style.height = `${element.target.scrollHeight + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT}px`
}
