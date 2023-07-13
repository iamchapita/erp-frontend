import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
/*     { name: 'Lo que sea', to: '/home', current: true },
 */]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar({ setDarkToggle, darkToggle }) {
    return (
        <Disclosure as="nav" className="bg-custom-100">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-14 items-center justify-between">
                            <div className="inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 hover:bg-custom-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    | <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6 dark:text-white" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6 dark:text-white" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>

                            </div>
                            <div
                                className="flex flex-1 items-center justify-center group sm:items-stretch sm:justify-start ">
                                <div
                                    className='text-black self-center relative  text-2xl font-medium dark:text-white'>Sync<span
                                        className='text-custom-300'>Pro</span></div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4 items-center">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    item.current ? 'bg-custom-300 text-custom-100' : 'text-white hover:bg-custom-300 hover:text-custom-100 transition-all ease-in-out',
                                                    'rounded-md px-3 py-[1.5px] text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    as="a"
                                    to={item.to}
                                    className={classNames(
                                        item.current ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}





