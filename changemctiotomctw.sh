grep -rl 'www.mctavish.work' ./ | LC_ALL=C xargs sed -i '' 's/www.mctavish.work/mctavish.work/g'

