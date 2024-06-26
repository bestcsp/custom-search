function fourSumCount(nums1, nums2, nums3, nums4) {
    const sumMap = new Map();
    let count = 0;

    // Calculate all possible sums of pairs from nums1 and nums2
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            let sum = nums1[i] + nums2[j];
            sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
        }
    }
console.log("sum set -->",sumMap)
    // Calculate all possible sums of pairs from nums3 and nums4
    for (let k = 0; k < nums3.length; k++) {
        for (let l = 0; l < nums4.length; l++) {
            let sum = nums3[k] + nums4[l];
            if (sumMap.has(-sum)) {
                console.log("i,j",l,k,sumMap.has(sum))
                count += sumMap.get(-sum);
            }
        }
    }

    return count;
}

// Example usage
const nums1 = [0]//[1, 2];
const nums2 = [0]//[-2, -1];
const nums3 = [0]//[-1, 2];
const nums4 = [0]//[0, 2];

console.log(fourSumCount(nums1, nums2, nums3, nums4)); // Output: 2
