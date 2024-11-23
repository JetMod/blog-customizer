import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, SyntheticEvent, useEffect } from 'react';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	OptionType,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	onChange: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const initialState = useRef<ArticleStateType>(defaultArticleState);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		initialState.current.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		initialState.current.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		initialState.current.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(initialState.current.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		initialState.current.contentWidth
	);

	useEffect(() => {
		if (!isMenuVisible) return;

		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;
			const isClickOutside =
				target instanceof Node &&
				containerRef.current &&
				!containerRef.current.contains(target);
			if (isClickOutside) {
				setIsMenuVisible(false);
			}
		};

		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsMenuVisible(false);
			}
		};

		document.addEventListener('keydown', handleEscapeKey);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isMenuVisible]);

	const toggleMenuVisibility = () => {
		setIsMenuVisible((prev) => !prev);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setSelectedFontFamily(option);
	};

	const handleFontSizeChange = (option: OptionType) => {
		setSelectedFontSize(option);
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};

	const handleFontColorChange = (option: OptionType) => {
		setSelectedFontColor(option);
	};

	const handleContentWidthChange = (option: OptionType) => {
		setSelectedContentWidth(option);
	};

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onChange({
			fontFamilyOption: selectedFontFamily,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		});
	};

	const handleResetButtonClick = () => {
		onChange(initialState.current);

		setSelectedFontFamily(initialState.current.fontFamilyOption);
		setSelectedFontSize(initialState.current.fontSizeOption);
		setSelectedBackgroundColor(initialState.current.backgroundColor);
		setSelectedFontColor(initialState.current.fontColor);
		setSelectedContentWidth(initialState.current.contentWidth);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton onClick={toggleMenuVisibility} isOpen={isMenuVisible} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuVisible,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleResetButtonClick}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
