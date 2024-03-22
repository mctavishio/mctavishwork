grep -rl '"author": "https://mctavish.work/"' ./ | LC_ALL=C xargs sed -i '' 's#"author": "https://mctavish\.work/bio\.html"#"author": "https://mctavish\.work/"#g'
