# HoltDateFormater

## Holt is vue-plugin used to simplify formatting the provided date into  the format that you want in easy way 

# Npm website

https://www.npmjs.com/package/holtdataformater

Core Features
- Get time passed since a certain date in a define formate 
- Get days,month,years that passed since a certain date in a define formate 
- Check if that date is yesterday or tommorrow or today


### first you need to install the plugin 
```
npm i holtdataformater
```
```
import HoltDateFormater from 'holtdataformater';

let holtOptions = {
    shortTrack: true,
    longTrack: false,
    percies: true,
    formate: true
}

app.use(HoltDateFormater,holtOptions)

 ``` 
 
 ```
 <p v-HoltFormater:[formate]="date"></p>
export default ({
    data()
    {
        return {
            date: "3/23/2020",
            formate: 'dd ll ss qq ww jj yy  hh:ii:zz'
        }
    },
})
```
 
Option | Default
------------ | -------------
shortTrack| true
longTrack | false
percies   | false
formate   | true


## ShortTrack 

Check if the provided date is today or yesterday or tommorrow

## LongTrack 

Get the number of days or months or years that passed since that date 

Ex: today is 10/19/2021 and i want to get time left until 10/22/2021 the output will be 3 days

## Percies 

Work only when long track is on lets say that i want to get the time passed since  10/10/2020 if today is 11/10/2021 without percies we will get 1 year but if it on we will get 1 year 1 month

## formate 

key | value
------------ | -------------
dd | day in number 
ll | day as string
ss   | day (short version) as string 
qq   | month (short version) as string
ww   | month as string
jj   | month in number
yy   | year
hh   | hour
ii   | min
zz   | sec









