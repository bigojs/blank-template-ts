import { Component } from 'bigojs'
import fs from 'fs'
import path from 'path'

export interface ErrorInterface {
  message: string,
  status: number,
  stack: string
}

const template = fs.readFileSync(path.resolve(__dirname, 'Error.html'), 'utf8')

/**
 * Class that represents an Error component
 */
export class ErrorComponent extends Component<ErrorInterface> {
  constructor(viewData: ErrorInterface) {
    super(viewData, template)
  }
}