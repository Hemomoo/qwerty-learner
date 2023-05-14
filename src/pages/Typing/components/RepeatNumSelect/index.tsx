import { typingRepeatNumAtom } from '@/store'
import { Popover, Transition, Listbox } from '@headlessui/react'
import { useAtom } from 'jotai'
import { Fragment, useCallback } from 'react'
import IconCheck from '~icons/tabler/check'
import IconChevronDown from '~icons/tabler/chevron-down'
import IconRepeatOnce from '~icons/tabler/repeat-once'

export default function SoundSwitcher() {
  interface RepeatNum {
    num: number
    label: string
  }
  const [typingRepeatNum, setTypingRepeatNum] = useAtom(typingRepeatNumAtom)
  const typingRepeatNums: RepeatNum[] = [
    {
      num: 1,
      label: '循环1次',
    },
    {
      num: 3,
      label: '循环3次',
    },
    {
      num: 5,
      label: '循环5次',
    },
    {
      num: 8,
      label: '循环8次',
    },
    {
      num: -1,
      label: '无限循环',
    },
  ]

  const setSelTypingRepeatNum = useCallback(
    (num: number) => {
      num === typingRepeatNum || setTypingRepeatNum(typingRepeatNums.find((item: RepeatNum) => item.num === num)?.num as number)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setTypingRepeatNum],
  )

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:bg-indigo-400 hover:text-white  ${
              open ? 'bg-indigo-500 text-white' : ''
            }`}
          >
            <IconRepeatOnce className="icon" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-2 flex max-w-max -translate-x-1/2 px-4 ">
              <div className="shadow-upper box-border flex w-60 select-none flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 drop-shadow dark:bg-gray-800">
                <div className="flex w-full  flex-col  items-start gap-2 py-0">
                  <span className="text-sm font-normal leading-5 text-gray-900 dark:text-white dark:text-opacity-60">循环次数</span>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Listbox value={typingRepeatNum} onChange={setSelTypingRepeatNum}>
                      <div className="relative w-full">
                        <Listbox.Button className="listbox-button w-full">
                          <span className="block truncate">
                            {typingRepeatNums.find((item: RepeatNum) => item.num === typingRepeatNum)?.label}
                          </span>
                          <span>
                            <IconChevronDown className="focus:outline-none" />
                          </span>
                        </Listbox.Button>

                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="listbox-options z-10">
                            {typingRepeatNums.map((item) => (
                              <Listbox.Option key={item.num} value={item.num}>
                                {({ selected }) => {
                                  return (
                                    <>
                                      <div className="group flex cursor-pointer items-center justify-between">
                                        <span>{item.label}</span>
                                        {selected ? (
                                          <span className="listbox-options-icon">
                                            <IconCheck className="focus:outline-none" />
                                          </span>
                                        ) : null}
                                      </div>
                                    </>
                                  )
                                }}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
