import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import React, { FunctionComponent, ReactChild, SVGProps } from 'react';

import Button from '@/components/Button';
import { IconCaret } from '@/icons';
import { makeComposableComponent } from '@/utils';

import Item from './DropdownItem';

import styles from './Dropdown.module.scss';

type Props = {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: ReactChild;
    className?: string;
    menuClassName?: string;
    buttonClassName?: string;
    withMobileDisplay?: boolean;
};

const Dropdown: FunctionComponent<Props> = ({
    icon,
    label,
    className,
    menuClassName,
    buttonClassName,
    withMobileDisplay,
    children,
}) => (
    <Menu as="div" className={classNames(styles.container, className)}>
        {({ open }) => (
            <>
                <Menu.Button as={React.Fragment}>
                    <Button
                        variation="navigation"
                        isActive={open}
                        icon={icon}
                        className={classNames(buttonClassName, {
                            [styles.buttonWithMobileDisplay]: withMobileDisplay,
                        })}
                    >
                        {label}
                        <IconCaret
                            className={classNames(styles.caret, { [styles.caretOpen]: open })}
                        />
                    </Button>
                </Menu.Button>
                <Menu.Items
                    as="ul"
                    className={classNames(
                        styles.menu,
                        { [styles.withMobileDisplay]: withMobileDisplay },
                        menuClassName,
                    )}
                >
                    {children}
                </Menu.Items>
            </>
        )}
    </Menu>
);

export default makeComposableComponent(Dropdown, { Item });
