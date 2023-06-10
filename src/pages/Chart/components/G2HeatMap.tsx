import type { WordDayTyping } from '@/utils/db/index'
import { useGetWordRecords } from '@/utils/db/index'
import { Chart } from '@antv/g2'
import { useEffect, useRef, useState } from 'react'

function dateGenerated() {
  const year = new Date().getFullYear()
  const monthDays = []
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const monthDay = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      monthDays.push({ monthDay })
    }
  }
  return monthDays
}

export default function G2Chart() {
  const container = useRef<HTMLDivElement | null>(null)
  const chart = useRef<Chart>()
  const wordRecords: Array<WordDayTyping> | null = useGetWordRecords()
  useEffect(() => {
    if (!chart.current && wordRecords) {
      chart.current = renderBarChart(container?.current)
    }
  }, [wordRecords])

  function dayTypingRecordsGenerate(typingDayRecords: Array<WordDayTyping>) {
    return dateGenerated().map((item) => {
      const currentTypingDay = typingDayRecords.find((typingDayRecord) => typingDayRecord.monthDay === item.monthDay)
      if (currentTypingDay) {
        return currentTypingDay
      } else {
        return {
          ...item,
          count: 0,
        }
      }
    })
  }

  function renderBarChart(container: HTMLElement | undefined | null) {
    const year = new Date().getFullYear()
    const chart = new Chart({
      container: container === null ? undefined : container,
      height: 300,
      theme: 'classic',
    })

    chart
      .cell()
      .data(dayTypingRecordsGenerate(wordRecords ? wordRecords : []))
      .tooltip({
        title: '正确单词数',
        items: [
          (d: WordDayTyping) => ({
            name: `日期: ${year}-${d.monthDay}`,
            value: d.count, // 使用 y 通道的值
          }),
        ],
      })
      .transform({ type: 'group', color: 'max' })
      .encode('x', (d: WordDayTyping) => d.monthDay.split('-')[1])
      .encode('y', (d: WordDayTyping) => d.monthDay.split('-')[0])
      .encode('color', 'count')
      .style('inset', 2)
      .style('stroke', '#ccc')
      .scale('color', {
        type: 'sequential',
        palette: 'blues',
      })
    8 // 渲染可视化
    chart.render()
    return chart
  }
  return (
    <div className="App">
      <div ref={container}></div>
    </div>
  )
}
