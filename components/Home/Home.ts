import { Component } from 'bigojs'
import fs from 'fs'
import path from 'path'

export interface HomeInterface {
  title: string
}

const template = fs.readFileSync(path.resolve(__dirname, 'Home.html'), 'utf8')

/**
 * Class that represents an Home component
 */
export class HomeComponent extends Component<HomeInterface> {
  constructor(viewData: HomeInterface) {
    super(viewData, template)
  }
}