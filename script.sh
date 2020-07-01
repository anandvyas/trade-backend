#!/bin/bash

pwd="/var/www/html/trade-backend"
currentDate=$(date +"%Y%m%d")

stocks=("ICICIBANK|1270529" "AXISBANK|1510401" "GAIL|1207553" "HDFCBANK|341249" "KOTAKBANK|492033")

cd $pwd

case "$1" in
    start )
        echo "############################## $(date +"%Y-%m-%d %T") #############################" >> ./logs/all-logs.log
        echo "$(date +"%Y-%m-%d %T") info: Start the script..." >> ./logs/all-logs.log
        
        echo "$(date +"%Y-%m-%d %T") info: Start login..." >> ./logs/all-logs.log
        node login.js

        echo "$(date +"%Y-%m-%d %T") info: Start process..." >> ./logs/all-logs.log
        for i in "${stocks[@]}"; do
            arrIN=(${i//|/ })
            pm2 start master.js --name ${arrIN[0]} -- ${arrIN[1]}
        done
        
    ;;
    stop )
        echo "$(date +"%Y-%m-%d %T") info: Stop the script..." >> ./logs/all-logs.log

        for i in "${stocks[@]}"; do
            arrIN=(${i//|/ })
            pm2 stop ${arrIN[0]} 
            pm2 delete ${arrIN[0]} 
        done
        
        # move data to S3 and clean VM
        echo "$(date +"%Y-%m-%d %T") info: Moving the data to S3" >> ./logs/all-logs.log
        aws s3 sync ./data/$currentDate s3://angelda/$currentDate
        echo "$(date +"%Y-%m-%d %T") info: Removed today data" >> ./logs/all-logs.log
        rm -rf ./data/$currentDate
    ;;
    * )
        echo "Usage: $0 {start|stop}"
    ;;
esac
