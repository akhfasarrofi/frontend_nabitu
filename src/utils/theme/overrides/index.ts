import Button from './Button'
import Card from './Card'
import CssBaseline from './CssBaseline'
import Input from './Input'
import Tooltip from './Tooltip'
import Typography from './Typography'

export default function ComponentsOverrides(theme: any) {
  return Object.assign(
    Card(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Typography(theme),
    CssBaseline(),
  )
}
