import Forecast from './components/Forecast';
import Search from './components/Search';
import useForecast from './hooks/useForecast';

function App() {
	const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } = useForecast();

	return (
		<>
			{forecast ? (
				<main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-full w-full">
					<Forecast data={forecast} />
				</main>
			) : (
				<main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
					<Search
						term={term}
						options={options}
						onInputChange={onInputChange}
						onOptionSelect={onOptionSelect}
						onSubmit={onSubmit}
					/>
				</main>
			)}
		</>
	);
}

export default App;
