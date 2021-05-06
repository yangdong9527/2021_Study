import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'
import ImoocAnalyzer from './imoocAnalyzer'

interface Course {
  title: string,
  price: number
}

interface courseResult {
  time: number,
  data: Course[]
}
interface Content {
  [propsName: number]: Course[]
}

// 小细节
export interface Analyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private analyzer: Analyzer, private url: string) {
    this.initSpiderProcess()
  }
}

const url = 'https://www.imooc.com'
const analyzer = new ImoocAnalyzer()
const crowller = new Crowller(analyzer, url)