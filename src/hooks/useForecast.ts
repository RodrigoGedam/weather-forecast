import { ChangeEvent, useEffect, useState } from 'react';
import { ForecastT, OptionsT } from './../types';

export default function useForecast() {
	const [term, setTerm] = useState<string>('');
	const [city, setCity] = useState<OptionsT | null>(null);
	const [options, setOptions] = useState<[]>([]);
	const [forecast, setForecast] = useState<ForecastT | null>(null);

	const getSearchOption = (value: string) => {
		fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=578d60604a2d40792256eb1932d948c5`)
			.then((res) => res.json())
			.then((data) => setOptions(data))
			.catch((e) => console.log(e));
	};

	const onOptionSelect = (option: OptionsT) => {
		setCity(option);
	};

	const onSubmit = () => {
		if (!city) return;

		getForecast(city);
	};

	const getForecast = (city: OptionsT) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang={pt_br}&appid=578d60604a2d40792256eb1932d948c5`
		)
			.then((res) => res.json())
			.then((data) => {
				const forecastData = {
					...data.city,
					list: data.list.slice(0, 16),
				};
				setForecast(forecastData);
			})
			.catch((e) => console.log(e));
	};

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trimStart();
		setTerm(value);
		if (value === '') return;
		getSearchOption(value.trimEnd());
	};

	useEffect(() => {
		if (city) {
			setTerm(city.name);
			setOptions([]);
		}
	}, [city]);

	return {
		term,
		options,
		forecast,
		onInputChange,
		onOptionSelect,
		onSubmit,
	};
}
