import pandas as pd
import random

class LotteryAnalyzer:
    def __init__(self, csv_file="../data/past_draws.csv"):
        self.df = pd.read_csv(csv_file)
        self.df = self.df.select_dtypes(include='number')
        self.all_numbers = self.df.values.flatten().astype(int)
        self.frequency = pd.Series(self.all_numbers).value_counts().sort_index()
        self.total_draws = self.df.shape[0]
        self.probability = self.frequency / self.total_draws
        self.hot_numbers = self.frequency.sort_values(ascending=False).head(10)
        self.cold_numbers = self.frequency.sort_values().head(10)
        self.odd_numbers = [n for n in self.frequency.index if n % 2 != 0]
        self.even_numbers = [n for n in self.frequency.index if n % 2 == 0]
        self.low_numbers = [n for n in self.frequency.index if n <= 24]
        self.high_numbers = [n for n in self.frequency.index if n >= 25]

    def rolling_frequency(self, window=20):
        return self.df.tail(window).apply(pd.Series.value_counts, axis=0).fillna(0).sum(axis=1).sort_index()

    def pick_numbers(self):
        selected = set()
        selected.update(random.sample(list(self.hot_numbers.index), 2))
        selected.update(random.sample(list(self.cold_numbers.index), 1))

        while len(selected) < 6:
            candidate = random.choice(list(self.frequency.index))
            if candidate in selected:
                continue

            selected_list = list(selected)
            odd_count = len([n for n in selected_list if n % 2 != 0])
            even_count = len([n for n in selected_list if n % 2 == 0])
            low_count = len([n for n in selected_list if n <= 24])
            high_count = len([n for n in selected_list if n >= 25])

            if odd_count < 3 and candidate % 2 != 0:
                selected.add(candidate)
            elif even_count < 3 and candidate % 2 == 0:
                selected.add(candidate)
            elif len(selected) + 1 <= 6:
                selected.add(candidate)

        selected_list = list(selected)
        if not any(n <= 24 for n in selected_list):
            selected_list[0] = random.choice(self.low_numbers)
        if not any(n >= 25 for n in selected_list):
            selected_list[1] = random.choice(self.high_numbers)

        return sorted(selected_list)
