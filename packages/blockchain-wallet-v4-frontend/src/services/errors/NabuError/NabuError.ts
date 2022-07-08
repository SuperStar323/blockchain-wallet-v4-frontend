import { NabuErrorAction, NabuErrorIconProps, NabuErrorProps } from './NabuError.types'

class NabuError extends Error {
  title: string

  icon?: NabuErrorIconProps

  message: string

  category?: string[]

  actions?: NabuErrorAction[]

  constructor({ actions, category, icon, message, title }: NabuErrorProps) {
    super(title)

    this.title = title
    this.message = message
    this.category = category
    this.icon = icon
    this.actions = actions?.filter((action) => !!action.title)
  }
}

export default NabuError
