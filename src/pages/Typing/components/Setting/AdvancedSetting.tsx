import styles from './index.module.css'
import {
  isIgnoreCaseAtom,
  isShowAnswerOnHoverAtom,
  isShowPrevAndNextWordAtom,
  isTextSelectableAtom,
  randomConfigAtom,
  typingRepeatNumAtom,
} from '@/store'
import { Switch } from '@headlessui/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

export default function AdvancedSetting() {
  const [randomConfig, setRandomConfig] = useAtom(randomConfigAtom)
  const [isShowPrevAndNextWord, setIsShowPrevAndNextWord] = useAtom(isShowPrevAndNextWordAtom)
  const [isIgnoreCase, setIsIgnoreCase] = useAtom(isIgnoreCaseAtom)
  const [isTextSelectable, setIsTextSelectable] = useAtom(isTextSelectableAtom)
  const [isShowAnswerOnHover, setIsShowAnswerOnHover] = useAtom(isShowAnswerOnHoverAtom)
  interface RepeatNum {
    num: number
    label: string
  }

  const [typingRepeatNum, setTypingRepeatNum] = useAtom(typingRepeatNumAtom)
  const typingRepeatNums: RepeatNum[] = [
    {
      num: 1,
      label: '1次',
    },
    {
      num: 3,
      label: '3次',
    },
    {
      num: 5,
      label: '5次',
    },
    {
      num: 8,
      label: '8次',
    },
    {
      num: -1,
      label: '∞',
    },
  ]

  const onToggleRandom = useCallback(
    (checked: boolean) => {
      setRandomConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setRandomConfig],
  )

  const onToggleLastAndNextWord = useCallback(
    (checked: boolean) => {
      setIsShowPrevAndNextWord(checked)
    },
    [setIsShowPrevAndNextWord],
  )

  const onToggleIgnoreCase = useCallback(
    (checked: boolean) => {
      setIsIgnoreCase(checked)
    },
    [setIsIgnoreCase],
  )

  const onToggleTextSelectable = useCallback(
    (checked: boolean) => {
      setIsTextSelectable(checked)
    },
    [setIsTextSelectable],
  )
  const onToggleShowAnswerOnHover = useCallback(
    (checked: boolean) => {
      setIsShowAnswerOnHover(checked)
    },
    [setIsShowAnswerOnHover],
  )

  return (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>章节乱序</span>
        <span className={styles.sectionDescription}>开启后，每次练习章节中单词会随机排序。下一章节生效</span>
        <div className={styles.switchBlock}>
          <Switch checked={randomConfig.isOpen} onChange={onToggleRandom} className="switch-root">
            <span aria-hidden="true" className="switch-thumb" />
          </Switch>
          <span className="text-right text-xs font-normal leading-tight text-gray-600">{`随机已${
            randomConfig.isOpen ? '开启' : '关闭'
          }`}</span>
        </div>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>练习时展示上一个/下一个单词</span>
        <span className={styles.sectionDescription}>开启后，练习中会在上方展示上一个/下一个单词</span>
        <div className={styles.switchBlock}>
          <Switch checked={isShowPrevAndNextWord} onChange={onToggleLastAndNextWord} className="switch-root">
            <span aria-hidden="true" className="switch-thumb" />
          </Switch>
          <span className="text-right text-xs font-normal leading-tight text-gray-600">{`展示单词已${
            isShowPrevAndNextWord ? '开启' : '关闭'
          }`}</span>
        </div>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>是否忽略大小写</span>
        <span className={styles.sectionDescription}>开启后，输入时不区分大小写，如输入“hello”和“Hello”都会被认为是正确的</span>
        <div className={styles.switchBlock}>
          <Switch checked={isIgnoreCase} onChange={onToggleIgnoreCase} className="switch-root">
            <span aria-hidden="true" className="switch-thumb" />
          </Switch>
          <span className="text-right text-xs font-normal leading-tight text-gray-600">{`忽略大小写已${
            isIgnoreCase ? '开启' : '关闭'
          }`}</span>
        </div>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>是否允许选择文本</span>
        <span className={styles.sectionDescription}>开启后，可以通过鼠标选择文本 </span>
        <div className={styles.switchBlock}>
          <Switch checked={isTextSelectable} onChange={onToggleTextSelectable} className="switch-root">
            <span aria-hidden="true" className="switch-thumb" />
          </Switch>
          <span className="text-right text-xs font-normal leading-tight text-gray-600">{`选择文本已${
            isTextSelectable ? '开启' : '关闭'
          }`}</span>
        </div>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>是否允许默写模式下显示提示</span>
        <span className={styles.sectionDescription}>开启后，可以通过鼠标 hover 单词显示正确答案 </span>
        <div className={styles.switchBlock}>
          <Switch checked={isShowAnswerOnHover} onChange={onToggleShowAnswerOnHover} className="switch-root">
            <span aria-hidden="true" className="switch-thumb" />
          </Switch>
          <span className="text-right text-xs font-normal leading-tight text-gray-600">{`显示提示已${
            isShowAnswerOnHover ? '开启' : '关闭'
          }`}</span>
        </div>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>每个单词重复的次数</span>
        <ToggleGroup.Root
          className="ToggleGroup"
          type="single"
          value={typingRepeatNum.toString()}
          aria-label="Text alignment"
          onValueChange={(value) => {
            Number(value) && setTypingRepeatNum(Number(value))
          }}
        >
          {typingRepeatNums.map((repeatNum: RepeatNum, index: number) => {
            return (
              <ToggleGroup.Item
                className={`h-8 w-8 bg-indigo-200 text-base text-white ${typingRepeatNum === repeatNum.num ? 'bg-indigo-500' : ''} ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${index === typingRepeatNums.length - 1 ? 'rounded-r-lg' : ''}`}
                value={repeatNum.num.toString()}
                key={repeatNum.num}
                aria-label="Left aligned"
              >
                <div>{repeatNum.label}</div>
              </ToggleGroup.Item>
            )
          })}
        </ToggleGroup.Root>
      </div>
    </div>
  )
}
