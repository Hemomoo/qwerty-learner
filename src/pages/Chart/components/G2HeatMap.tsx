import type { WordDayTyping } from '@/utils/db/index'
import { useGetWordRecords } from '@/utils/db/index'
import { Chart } from '@antv/g2'
import { useEffect, useRef } from 'react'

function generateMonthDaysArray() {
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

export default function G2Chart<T>() {
  const container = useRef<HTMLDivElement | null>(null)
  const chart = useRef<Chart>()
  const wordRecords: Array<WordDayTyping> | null = useGetWordRecords() as Array<WordDayTyping>
  useEffect(() => {
    if (!chart.current) {
      chart.current = renderBarChart(container?.current)
      console.log('wordRecords>>>>>: ', wordRecords)
    }
  }, [wordRecords])

  const typingDayRecords: Array<WordDayTyping> = [
    {
      timeStamp: '1684190000',
      monthDay: '05-16',
      count: 7,
    },
    {
      timeStamp: '1684200000',
      monthDay: '05-16',
      count: 21,
    },
    {
      timeStamp: '1684220000',
      monthDay: '05-16',
      count: 27,
    },
    {
      timeStamp: '1684970000',
      monthDay: '05-25',
      count: 21,
    },
    {
      timeStamp: '1684980000',
      monthDay: '05-25',
      count: 27,
    },
    {
      timeStamp: '1684990000',
      monthDay: '05-25',
      count: 1,
    },
    {
      timeStamp: '1685000000',
      monthDay: '05-25',
      count: 3,
    },
    {
      timeStamp: '1685010000',
      monthDay: '05-25',
      count: 1,
    },
    {
      timeStamp: '1685060000',
      monthDay: '05-26',
      count: 5,
    },
    {
      timeStamp: '1685950000',
      monthDay: '06-05',
      count: 9,
    },
  ]

  const typingDayRecordArr = generateMonthDaysArray().map((item) => {
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

  function renderBarChart(container: HTMLElement | undefined | null) {
    const chart = new Chart({
      container: container === null ? undefined : container,
      height: 300,
      theme: 'classic',
    })

    chart
      .cell()
      .data(typingDayRecordArr)
      .transform({ type: 'group', color: 'max' })
      .encode('x', (d: WordDayTyping) => d.monthDay.split('-')[1])
      .encode('y', (d: WordDayTyping) => d.monthDay.split('-')[0])
      .encode('color', 'count')
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
