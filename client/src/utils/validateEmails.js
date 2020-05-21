
//name starts with small letter as it is not returning a component for returning functions, capital letter we start when we are exporting a component

// we got this regex from emailregex.com website for javascript
const re = 	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (emails) => {
    const invalidEmails = emails.toString()
                        .split(',')
                        .map(email => email.trim()) //map take every element from array and add, execute, modify according to given condition on right side of arrow and return the array with updated values
                        .filter(email => re.test(email) === false ) //filter functions works almost similar to map function, we would see if email is valid we would return false, means will remove from array and if invalid we will retrun true (add to array)
                        // we will return invalid emails, so that we can tell user these emails are invalid
                        //re.test(email) would check if this email is valid or not
    
    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`
        //we used backtricks here for using string
    }

    return;
}

/*const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
}; */