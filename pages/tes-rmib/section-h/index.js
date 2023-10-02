import ButtonPrimary from '@/components/button/ButtonPrimary';
import LayoutRmib from '@/components/rmib/LayoutRmib';
import React, { useState, useEffect } from 'react';
import ButtonAbuBgt from '@/components/button/ButtonAbuBgt';
import SetCategory from '@/components/button/ButtonCategory';
import Loader from '@/components/Loader';
import { Alert } from 'antd';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
  const categories = [
    { man: 'Outdoor', woman: 'Outdoor', name: 'outdoor' },
    { man: 'Mecanical', woman: 'Outdoor', name: 'mecanical' },
    { man: 'Computational', woman: 'Outdoor', name: 'computational' },
    { man: 'Science', woman: 'Outdoor', name: 'science' },
    { man: 'Personal Contact', woman: 'Outdoor', name: 'personalContact' },
    { man: 'Aesthetic', woman: 'Outdoor', name: 'aesthetic' },
    { man: 'Literary', woman: 'Outdoor', name: 'literary' },
    { man: 'Music', woman: 'Outdoor', name: 'music' },
    { man: 'Social Service', woman: 'Outdoor', name: 'socialService' },
    { man: 'Clarical', woman: 'Outdoor', name: 'clarical' },
    { man: 'Practical', woman: 'Outdoor', name: 'practical' },
    { man: 'Medical', woman: 'Outdoor', name: 'medical' },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('accumulatedValues'));

    console.log('hasil', data);

    let total = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (!isNaN(value)) {
          total += value;
        }
      }
    }

    console.log('Total', total);
  });

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFieldCategory, setSelectedFieldCategory] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [selectDisabled, setSelectDisabled] = useState({});

  const handleSelectChange = (event, categoryName) => {
    const selectedNumber = parseInt(event.target.value);

    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [categoryName]: selectedNumber,
    }));

    if (fieldValues[categoryName] === undefined) {
      setSelectedFields([
        ...selectedFields,
        { number: selectedNumber, title: categoryName },
      ]);
      handleFieldCategoryChange(selectedNumber);

      setFieldValues((prevValues) => ({
        ...prevValues,
        [categoryName]: selectedNumber,
      }));

      // Set status disabled untuk kategori ini menjadi true
      setSelectDisabled((prevSelectDisabled) => ({
        ...prevSelectDisabled,
        [categoryName]: true,
      }));
    } else {
      // Jika nilai sudah ada, batalkan pemilihan
      const updatedNumbers = { ...selectedNumbers };
      updatedNumbers[categoryName] = '';
      setSelectedNumbers(updatedNumbers);

      const updatedFields = selectedFields.filter(
        (field) => field.title !== categoryName,
      );
      setSelectedFields(updatedFields);

      setSelectedFieldCategory((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[selectedNumber];
        return updatedMap;
      });

      setFieldValues((prevValues) => {
        const updatedValues = { ...prevValues };
        delete updatedValues[categoryName];
        return updatedValues;
      });

      setSelectDisabled((prevSelectDisabled) => ({
        ...prevSelectDisabled,
        [categoryName]: false,
      }));
    }
  };

  const handleFieldCategoryChange = (fieldNumber) => {
    if (!selectedCategory) {
      return;
    }

    const selectedCategoryObj = categories.find(
      (cat) => cat.name === selectedCategory,
    );

    if (!selectedCategoryObj) {
      return;
    }

    setSelectDisabled((prevSelectDisabled) => ({
      ...prevSelectDisabled,
      [categoryName]: false,
    }));

    const categoryName = selectedCategoryObj.name;
    setSelectedFieldCategory((prevMap) => ({
      ...prevMap,
      [fieldNumber]: categoryName,
    }));

    const fieldValue = fieldNumber;

    setFieldValues((prevValues) => ({
      ...prevValues,
      [categoryName]: fieldValue,
    }));
  };

  const handleCancel = (categoryName) => {
    setSelectedNumbers((prevSelectedNumbers) => {
      const { [categoryName]: removedValue, ...rest } = prevSelectedNumbers;
      return rest;
    });

    const updatedFields = selectedFields.filter(
      (field) => field.title !== categoryName,
    );

    setSelectedFields(updatedFields);

    setSelectedFieldCategory((prevMap) => {
      const updatedMap = { ...prevMap };
      for (const field of updatedFields) {
        delete updatedMap[field.number];
      }
      return updatedMap;
    });

    setFieldValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[categoryName];
      return updatedValues;
    });

    // Set status disabled untuk kategori ini menjadi false (bisa diklik)
    setSelectDisabled((prevSelectDisabled) => ({
      ...prevSelectDisabled,
      [categoryName]: false,
    }));
  };

  const handlePrev = () => {
    router.push('/tes-rmib/section-a');
  };

  const handleNextClick = () => {
    const storedValue = localStorage.getItem('accumulatedValues');
    if (Object.keys(fieldValues).length === 12) {
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);

        const accumulatedValues = { ...fieldValues };

        for (const category in parsedValue) {
          if (parsedValue.hasOwnProperty(category)) {
            if (!accumulatedValues[category]) {
              accumulatedValues[category] = parsedValue[category];
            } else {
              accumulatedValues[category] += parsedValue[category];
            }
          }
        }

        localStorage.setItem(
          'accumulatedValues',
          JSON.stringify(accumulatedValues),
        );
        console.log('Accumulated values:', accumulatedValues);
      }
      setIsLoading(true);
      localStorage.setItem('value', JSON.stringify(fieldValues));
      setTimeout(() => {
        setIsLoading(false);
        router.push('/tes-rmib/section-i');
      }, 3000);
    } else {
      setAlertVisible(true);
      setMessage('Pilih semua jenis pekerjaan');
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  };

  const sortedSelectedFields = selectedFields
    .slice()
    .sort((a, b) => a.number - b.number);

  console.log('field value', fieldValues);

  return (
    <LayoutRmib>
      {isLoading ? <Loader /> : null}
      <section className="mb-20 md:px-16 lg:px-40">
        <div className="flex justify-center space-x-8">
          <ButtonPrimary title={'Section A'} />
        </div>
        <p className="mt-12 mb-12 font-semibold text-center text-black">
          Urutkan bidang pekerjaan berikut berdasarkan yang paling kamu sukai
        </p>

        <span className="flex justify-center">
          {alertVisible ? (
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 backdrop-blur-md">
              <Alert
                type="error"
                message={message}
                showIcon
                className="w-1/2 mb-5 text-center"
              />
            </div>
          ) : null}
        </span>

        <div className="flex flex-col items-center w-full space-y-4 ">
          <div className="flex justify-between w-full px-5 font-bold lg:px-10">
            <div>Laki-Laki</div>
            <div>Perempuan</div>
          </div>
          {categories.map((category, i) => (
            <div key={i} className="w-full mb-4">
              <SetCategory men={category.man} woman={category.woman}>
                <select
                  onChange={(event) => handleSelectChange(event, category.name)}
                  value={selectedNumbers[category.name] || ''}
                  disabled={selectDisabled[category.name]}
                  className="w-32 p-2 font-semibold text-center border-2 rounded border-primary"
                >
                  <option value="" disabled={!selectedCategory}>
                    {selectedNumbers[category.name]
                      ? `Nomor ${selectedNumbers[category.name]}`
                      : 'Pilih nomor'}
                  </option>
                  {numbers.map((number) => {
                    const isNumberSelected = selectedFields.some(
                      (field) => field.number === number,
                    );
                    return (
                      <option
                        key={number}
                        value={number}
                        disabled={isNumberSelected}
                      >
                        {number}
                      </option>
                    );
                  })}
                </select>

                {selectedFields.some(
                  (field) => field.title === category.name,
                ) && (
                  <button
                    onClick={() => handleCancel(category.name)}
                    className="p-2 ml-2 font-medium text-red-600 border-2 rounded hover:text-primary hover:bg-kuning border-primary"
                  >
                    Cancel
                  </button>
                )}
              </SetCategory>
            </div>
          ))}
        </div>

        <fieldset className="flex justify-between mt-20">
          <ButtonAbuBgt onClick={handlePrev} title={'Kembali'} />
          <ButtonAbuBgt title={'Selanjutnya'} onClick={handleNextClick} />
        </fieldset>
      </section>
    </LayoutRmib>
  );
};

export default Index;
