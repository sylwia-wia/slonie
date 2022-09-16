#!/bin/bash

for file in seeds/*.in; do
  result=$(node --stack-size=65000  app.js < "${file}")

  fileBasename=`basename -- "$file"`
  filename="${fileBasename%.*}"
  referenceResult=`cat "seeds/${filename}.out"`

  isEqual="NOK !!!"

  if [ $result -eq $referenceResult ]; then
    isEqual="OK"
  fi

  echo $result $referenceResult $isEqual
done